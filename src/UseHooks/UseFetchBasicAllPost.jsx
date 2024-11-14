import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListBasicGetAll } from "../Redux/Features/Api/ProductApi";
import { listPostBasicSuccess } from "../Redux/Features/Products/ListSlice";
import isEqual from "lodash/isEqual";

const UseFetchBasicAllPost = () => {
    const dispatch = useDispatch();
    const { postBasicList, listLoading, listError } = useSelector((state) => state.listProducts);

    const [cachedMediaList] = useState(() => {
        const storedBasic = localStorage.getItem("mediaListBasicStorage");
        return storedBasic ? JSON.parse(storedBasic) : null;
    });

    useEffect(() => {
        if (cachedMediaList && postBasicList.length === 0) {
            dispatch(listPostBasicSuccess(cachedMediaList));
        } else if (!cachedMediaList) {
            dispatch(ListBasicGetAll());
        }
    }, [dispatch, cachedMediaList, postBasicList.length]);

    useEffect(() => {
        if (postBasicList.length > 0) {
            const isDifferent = !isEqual(postBasicList, cachedMediaList); // Usa isEqual per il confronto

            if (isDifferent) {
                localStorage.setItem("mediaListBasicStorage", JSON.stringify(postBasicList));
            }
        }
    }, [postBasicList, cachedMediaList]);

    return { postBasicList, listLoading, listError };
};

export default UseFetchBasicAllPost;
