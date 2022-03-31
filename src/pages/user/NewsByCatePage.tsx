import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../api/categoryNews";
import { getNewsById } from "../../api/news";
import NavNews from "../../components/user/NavNews";
import NewsContent from "../../components/user/NewsContent";

const NewsByCatePage = () => {
    const { slug, page } = useParams();
    const [cateId, setCateId] = useState<string>();

    useEffect(() => {
        const getCateId = async () => {
            const { data } = await get(slug);
            setCateId(data._id);
        };
        getCateId();
    }, [slug]);

    return (
        <>
            <NavNews slug={slug} />

            <NewsContent getNews={getNewsById} page={Number(page) || 1} url={`tin-tuc/${slug}`} parameter={cateId} />
        </>
    )
}

export default NewsByCatePage;