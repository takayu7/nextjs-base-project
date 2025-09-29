import { useState } from "react";
import { AiFillSkin } from "react-icons/ai";
import {
  BsCameraReelsFill,
  BsFillBasket2Fill,
  BsFillGiftFill,
  BsFillMortarboardFill,
} from "react-icons/bs";
import {
  FaCameraRetro,
  FaCarSide,
  FaFly,
  FaGlassCheers,
  FaHeart,
  FaPlane,
} from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import {
  PiBaseballFill,
  PiCoffeeFill,
  PiHamburgerBold,
  PiHighHeelBold,
  PiMusicNotesFill,
  PiPawPrintFill,
  PiTrainFill,
PiBookFill 
} from "react-icons/pi";

export const SelectedIcons = () => {
  const [selected, setSelected] = useState("");

  const optionsIcon = [
    { value: "clothes", label: <AiFillSkin size={24} /> },
    { value: "movies", label: <BsCameraReelsFill size={24} /> },
    { value: "shopping", label: <BsFillBasket2Fill size={24} /> },
    { value: "gift", label: <BsFillGiftFill size={24} /> },
    { value: "study", label: <BsFillMortarboardFill size={24} /> },
    { value: "camera", label: <FaCameraRetro size={24} /> },
    { value: "car", label: <FaCarSide size={24} /> },
    { value: "fly", label: <FaFly size={24} /> },
    { value: "glass", label: <FaGlassCheers size={24} /> },
    { value: "heart", label: <FaHeart size={24} /> },
    { value: "phone", label: <ImPhone size={24} /> },
    { value: "plane", label: <FaPlane size={24} /> },
    { value: "sport", label: <PiBaseballFill size={24} /> },
    { value: "coffee", label: <PiCoffeeFill size={24} /> },
    { value: "humburger", label: <PiHamburgerBold size={24} /> },
    { value: "heel", label: <PiHighHeelBold size={24} /> },
    { value: "music", label: <PiMusicNotesFill size={24} /> },
    { value: "dog", label: <PiPawPrintFill size={24} /> },
    { value: "book", label: <PiBookFill size={24} /> },
    { value: "train", label: <PiTrainFill size={24} /> },
  ];

  return (
    <div className="grid grid-cols-5 gap-5">
      {optionsIcon.map((i, index) => (
        <label
          key={index}
          className={` p-2 border-2 rounded-md ${
            selected === i.value ? "bg-yellow-500 text-white" : "bg-gray-50"
          }`}
        >
          <input
            type="radio"
            value={i.value}
            checked={selected === i.value}
            onChange={(e) => setSelected(e.target.value)}
            className="hidden"
          />
          {i.label}
        </label>
      ))}
    </div>
  );
};
