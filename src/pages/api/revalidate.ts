import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await res.revalidate("/"); // index 페이지를 revalidate
    return res.json({ revalidate: true });
  } catch (error) {
    res.status(500).send("Revalidation Failed!");
  }
}
// On-Demand ISR 적용이 되었는 지 확인하는 방법은 "http://3000/api/revalidate"
// 도메인으로 접속해보면 {"revalidate : true"}가 적용된 것을 확인할 수 있다.
