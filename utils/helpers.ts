import { Response } from 'express'





type DynamicContent = string | Record<string, unknown> | null | undefined | number

 
 const getRandomInt = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  
  

  const generateCode = (length: number) => {
    const timestamp = Date.now().toString()

    const parts = timestamp.split('').reverse()
    let id = ''

    for (let i = 0; i < length; ++i) {
      const index = getRandomInt(0, parts.length - 1)

      id += parts[index]
    }

    return id
  }

  
  
  


  export default {
   
    generateCode,
    
  } 
