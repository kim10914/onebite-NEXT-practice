import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // !단언 : 이 값은 없을 수가 없음
  const book = await fetchOneBook(Number(id));

  if(!book){
    return{
      notFound : true, // 페이지를 못 찾았을 경우 notFound 페이지로 이동
    }
  }

  return {
    props: { book },
  };
};

// 모든 동적 경로를 다 설정해야 함.
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } }, // URL 파라미터의 값은 무조건 문자열로 설정
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, // fallback은 대비책 이라는 뜻 임.
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩 중 입니다.";
  if (!book) return "문제가 발생했습니다. 다시 시도해주세요!";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
