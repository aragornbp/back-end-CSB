import { Request, Response } from "express";
import { listBandsService } from "../../services/user/listBands.service";

export const listBandsController = async (req: Request, res: Response) => {
  const bands = await listBandsService();
  return res.status(200).json(bands);
};
