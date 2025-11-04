import {
  Utensils,
  House,
  Star,
  ShoppingCart,
  Flame,
  BriefcaseMedical,
  Handshake,
  HandCoins,
} from "lucide-react";

//　円表示切り替え関数
const formatCurrency = (amount: number) => {
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString("ja-JP", {
    style: "currency",
    currency: "JPY",
  });
  return amount < 0 ? `￥- ${absAmount.toLocaleString("ja-JP")}` : formatted;
};

export const jpMoneyChange = (price: number) => {
  return formatCurrency(price);
};

//カテゴリアイコンを返す関数
export const categoryIcon = (
  categoryNumber: number,
  color?: string,
  size: number = 10
) => {
  const iconCss = "flex items-center gap-1";

  const commonProps = {
    className: "",
    style: { color: color || "currentColor", width: size, height: size },
  };

  switch (categoryNumber) {
    case 1:
      return (
        <div className={iconCss}>
          <House {...commonProps} />
        </div>
      );
    case 2:
      return (
        <div className={iconCss}>
          <Star {...commonProps} />
        </div>
      );
    case 3:
      return (
        <div className={iconCss}>
          <Utensils {...commonProps} />
        </div>
      );
    case 4:
      return (
        <div className={iconCss}>
          <Handshake {...commonProps} />
        </div>
      );
    case 5:
      return (
        <div className={iconCss}>
          <Flame {...commonProps} />
        </div>
      );
    case 6:
      return (
        <div className={iconCss}>
          <ShoppingCart {...commonProps} />
        </div>
      );
    case 7:
      return (
        <div className={iconCss}>
          <BriefcaseMedical {...commonProps} />
        </div>
      );
    case 8:
      return (
        <div className={iconCss}>
          <HandCoins {...commonProps} />
        </div>
      );
    default:
      return <div className={iconCss}>Unknown</div>;
  }
};
