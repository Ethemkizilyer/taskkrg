import Icon from "@/assets/icons/header/Icon";
import Logo from "@/assets/icons/header/logo";

const Header = () => {
    return (
        <div className="flex justify-between items-center px-[24px] py-3 h-[72px] bg-white border-b">
            <div className="text-[#145389] font-bold text-xl">
                <p>KARGAKARGA</p>
            </div>
            <div className="right flex gap-3 items-center">
                    <Icon />
                    <Icon />
                    <Logo />
            </div>
        </div>
    )
}

export default Header;