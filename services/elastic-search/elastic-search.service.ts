import { Client } from "@elastic/elasticsearch";
import { config } from "dotenv";
import path from "path";
config();
import fs from "fs";

export class ElasticSearchService {
  private client;
  constructor() {
    this.client = new Client({
      cloud: {
        id: process.env.ES_CLOUD_ID,
      },
      auth: {
        username: process.env.ES_USER_NAME,
        password: process.env.ES_PASS,
      },
    });
  }

  private indexName = "shakespeare";

  async checkConnection() {
    try {
      const response = await this.client.ping();
      if (response) {
        console.log("Elasticsearch connection is valid");
      } else {
        console.log("Unable to connect to Elasticsearch");
        throw new Error("Unable to connect to Elasticsearch");
      }
    } catch (error) {
      console.log("Error connecting to Elasticsearch:", error);
      throw new Error(error);
    }
  }
  async createIndex() {
    try {
      await this.client.indices.create({
        index: this.indexName,
        body: {
          mappings: {
            properties: {
              content: {
                type: "text",
              },
            },
          },
        },
      });
      console.log("Index created");
    } catch (err) {
      console.log(err);
    }
  }

  // Function to load the text file
  async loadTextFile() {
    try {
      const text = fs.readFileSync(
        path.join(__dirname, "..", "..", "completeworks.txt"),
        "utf8"
      );
      return text;
    } catch (err) {
      console.log(err);
      return "";
    }
  }

  // Function to index the documents
  async indexDocuments() {
    const content = await this.loadTextFile();
    const lines = content.split("\n");
    const documents = lines
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => ({
        content: line,
      }));

    const body = documents.flatMap((doc) => [
      { index: { _index: this.indexName } },
      doc,
    ]);

    try {
      await this.client.bulk({ refresh: true, body });
      // await this.client.index({
      //   index: this.indexName,
      //   body: {
      //     content,
      //   },
      // });
      console.log("Documents indexed");
    } catch (err) {
      console.log(err);
    }
  }

  // Call the functions using async/await
  async createIndexFromFile() {
    try {
      await this.checkConnection();
      await this.createIndex();
      const res = await this.indexDocuments();

      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  async search(keyword: string) {
    const response = await this.client.search({
      index: this.indexName,
      body: {
        query: {
          match: {
            content: keyword,
          },
        },
      },
    });

    return response;
  }
}
