import { ArrowBigLeft } from "lucide-react";
import { NavLink, useParams } from "react-router-dom"
import AccessoryPhoto from "../../components/AccessoryPhoto";

const ShowProductDetails = () => {
    const { id } = useParams();
    console.log(id);
  return (
    <div>
      <NavLink to={"/dashboard/products"}>
        <ArrowBigLeft size={40} />
      </NavLink>
      <div className="dark:bg-[#020817] shadow-lg  lg:w-[75%] w-[100%] mx-auto mt-10 rounded p-5 ">
        <img
          className="mb-2 rounded-lg"
          src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"
          alt="error"
        />
        <h1 className="md:text-xl lg:text-3xl font-bold mb-2">Products Name : Flowres</h1>
        <div className="flex justify-between mb-2">
          <h1 className="md:text-xl lg:text-2xl font-bold">Price : 200$</h1>
          <h1 className="md:text-xl lg:text-2xl font-bold">Category : Flowres</h1>
        </div>
        <h1 className="md:text-xl lg:text-2xl font-bold mb-2">
          Description : Perfect Flowers
        </h1>
        <h1 className="md:text-xl lg:text-2xl font-bold mb-2">Quantity : 20</h1>
        <div>
          <h1 className="md:text-xl lg:text-2xl font-bold mb-2">Accessory : </h1>
          <AccessoryPhoto />
        </div>
      </div>
    </div>
  );
}

export default ShowProductDetails