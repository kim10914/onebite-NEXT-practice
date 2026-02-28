import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

// export const getStaticProps = async (
//   context: GetStaticPropsContext,
// ) => {
//   console.log(context); // context 내부의 query를 확인할 수 있음
//   const q = context.query.q; // SSG 방식으로 변경할 경우, queryString은 빌드타임에 알 수 없기 때문에 오류가 발생한다.
//   const books = await fetchBooks(q as string);
//   return {
//     props: {
//       books
//     },
//   };
// };

export default function Page() {
  const router = useRouter(); // 경로 저장
  const q = router.query.q; // 경로의 쿼리스트링 저장

  const [books, setBooks] = useState<BookData[]>([]); // 검색된 Book의 데이터를 가지는 상태 배열

  // 검색된 Books을 조회하는 비동기 함수
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  // 쿼리스트링 업데이트에 따라 fetchSearchResult() 실행
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입 북스 - 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입북스"></meta>
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나 보세요."
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
