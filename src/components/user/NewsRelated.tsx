import { faNewspaper } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { relatedPost } from "../../api/news";
import { NewsType } from "../../types/news";

type NewsRelatedProps = {
    id: string | undefined,
    category: string | undefined,
};

const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return `${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
}

const NewsRelated = ({ id, category }: NewsRelatedProps) => {
    const [news, setNews] = useState<NewsType[]>();

    useEffect(() => {
        const getNewsRelated = async () => {
            const { data } = await relatedPost(id, category);
            setNews(data);
        };
        getNewsRelated();
    }, [id]);

    return (
        <>
            <h2 className="uppercase text-lg font-bold my-3">Bài viết liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {news?.map((item, index) => (
                    <div key={index}>
                        <Link
                            to={`/bai-viet/${item.slug}`}
                            style={{backgroundImage: `url(${item.thumbnail})`}}
                            className="block bg-cover bg-center pt-[70%] rounded-t-xl relative"
                        >
                            <button className="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                                <FontAwesomeIcon icon={faNewspaper} />
                            </button>
                        </Link>
                        <div className="bg-white rounded-b-xl shadow px-3 py-2">
                            <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
                            <h3>
                                <a href="/#/news/${item.id}" className="limit-line-2 block py-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black">{item.title}</a>
                            </h3>
                            <div className="limit-line-3 text-gray-500 text-sm text-justify">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default NewsRelated