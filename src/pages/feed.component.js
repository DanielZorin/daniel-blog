import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container.js";
import { firebaseFetchPostFeed } from "../redux/firebase.js";
import "./contents.style.scss";
import useLanguage from "../redux/use-language.js";
import Pagination from "../components/pagination.js";

const FeedPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const { language } = useLanguage();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["feed", language, currentPage],
    queryFn: () => firebaseFetchPostFeed(language, currentPage),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
      setTotalPosts(data.totalPosts);
    }
  }, [data]);

  if (isLoading || isFetching) return <LoadingContainer />;

  return (
    <>
      {data.posts.map((post, j) => (
        <div key={j} className="border-[2px] p-3 flex flex-col">
          <div className="text-[20px]">
            <Link to={`${language}/post/${post.id}`}>{post.title}</Link>
          </div>
          <div className="text-[12px]">{post.date}</div>
          <div dangerouslySetInnerHTML={{ __html: post.preview }}></div>
          <div>
            <Link to={`${language}/post/${post.id}`}>
              {language === "en" ? "Read more..." : "Читать дальше..."}
            </Link>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalPosts}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default FeedPage;
