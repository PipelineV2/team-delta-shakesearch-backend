import { AppController } from '../controllers/app';
import authenticate from '../utils/auth';
    
export class AppRoutes {
    public appController: AppController = new AppController();
   
    public routes(app): void {

        app.route('/temp').post([], this.appController.temp)
      


    }
}