import React from "react";
import { useAppSelector } from "../../redux/hooks";

export default function Footer(): JSX.Element {
  const logo = `${process.env.PUBLIC_URL}/image/LGSoftware.svg`;
  const { main } = useAppSelector((s) => s.all);
  return (
    <div className="footerDiv">
      {!main && <div className="rowDiv">
        <p>Информация</p>
        <p>Вакансии</p>
        <p>Помощь</p>
        <p>Конфиденциальность</p>
        <p>Правила</p>
        <p>FAQ</p>
        <p>Прайс-лист</p>
      </div>}
      <div className={!main ? "rowDivBottom" : 'mainFooter'}>
        <img src={logo} alt="Logo" className="footerLogo" />
      </div>
    </div>
  );
}
