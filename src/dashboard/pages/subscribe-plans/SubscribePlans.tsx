import { NavLink } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../store/store";
import Loader from "../../components/Loader";
import SubscribePlansTable from "../../components/SubscribePlans/SubscribePlansTable";
import { getSubscribePlans } from "../../../store/slices/subscribePlansSlice";

const SubscribePlans = () => {
  const dispatch = useReduxDispatch();

  const { subscribePlansData, loading } = useReduxSelector(
    (state) => state.subscribePlans
  );
  const fetchData = useCallback(() => {
    dispatch(getSubscribePlans());
  }, [dispatch]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <>

          
          <div className="flex justify-end">
            <NavLink
              to={"/dashboard/subscribe-plans/add"}
              className="bg-primary rounded p-4 font-bold mb-6">
              Add Subscribe Plan
            </NavLink>
          </div>
          <div>
            <SubscribePlansTable subscribePlansData={subscribePlansData} fetchData={fetchData} />
          </div>
        </>
      )}
    </>
  );
};

export default SubscribePlans;
