import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
    let url = 'http://localhost:12345/book';

    // 검색어가 있을 경우 api 분기
    if (q) {
        url += `/search?q=${q}`
    }

    // 모든 책 가져오기 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}