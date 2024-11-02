import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";


const DetailView = () => {

    const dispatch = useDispatch();
    // const id = useParams();

    // useEffect(() => {
    //     dispatch(getProductDetails(id.product_id));
    // }, [dispatch, id.product_id ]);
    const { product_id } = useParams(); // Destructure product_id

    useEffect(() => {
        dispatch(getProductDetails(product_id));
    }, [dispatch, product_id]);

    return (
        <div>
            hi
        </div>
    )
}
export default DetailView;