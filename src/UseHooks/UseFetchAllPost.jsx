import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListPostGetAll } from "../Redux/Features/Api/ProductApi";
import { listPostSuccess } from "../Redux/Features/Products/ListSlice";
import isEqual from "lodash/isEqual";

const UseFetchAllPost = () => {
    const dispatch = useDispatch();
    const { postList, listLoading, listError } = useSelector((state) => state.listProducts);

    const [cachedMediaList] = useState(() => {
        const stored = localStorage.getItem("mediaListStorage");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (cachedMediaList && postList.length === 0) {
            dispatch(listPostSuccess(cachedMediaList));
        } else if (!cachedMediaList) {
            dispatch(ListPostGetAll());
        }
    }, [dispatch, cachedMediaList, postList.length]);

    useEffect(() => {
        if (postList.length > 0) {
            const isDifferent = !isEqual(postList, cachedMediaList); // Usa isEqual per il confronto

            if (isDifferent) {
                localStorage.setItem("mediaListStorage", JSON.stringify(postList));
            }
        }
    }, [postList, cachedMediaList]);

    return { postList, listLoading, listError };
};

export default UseFetchAllPost;
