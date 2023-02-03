import { AuthController } from "@/server/auth";
import { ImageController } from "@/server/images";
import { firebaseConfig } from "@/server";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

class Server {
  private static _instance: Server;

  private _images: ImageController;
  private _auth: AuthController;

  private constructor() {
    const app = initializeApp(firebaseConfig);
    this._auth = new AuthController(getAuth(app));
    this._images = new ImageController(getFirestore(app));
  }

  public static GetInstance() {
    if (!this._instance) this._instance = new Server();
    return this._instance;
  }

  public get images() {
    return this._images;
  }

  public get auth() {
    return this._auth;
  }
}

export default Server.GetInstance();
