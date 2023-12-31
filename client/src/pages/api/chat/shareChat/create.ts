import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, OutLink } from '@/service/mongo';
import { authApp, authUser } from '@/service/utils/auth';
import type { ShareChatEditType } from '@/types/app';
import { customAlphabet } from 'nanoid';
import { OutLinkTypeEnum } from '@/constants/chat';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 24);

/* create a shareChat */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { appId, name } = req.body as ShareChatEditType & {
      appId: string;
    };

    await connectToDatabase();

    const { userId } = await authUser({ req, authToken: true });
    await authApp({
      appId,
      userId,
      authOwner: false
    });

    const shareId = nanoid();
    await OutLink.create({
      shareId,
      userId,
      appId,
      name,
      type: OutLinkTypeEnum.share
    });

    jsonRes(res, {
      data: shareId
    });
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
