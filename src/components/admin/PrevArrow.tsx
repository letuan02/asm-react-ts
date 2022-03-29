import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PrevArrowProps = {
    onClick: () => void
};

const PrevArrow = ({ onClick }: PrevArrowProps) => {
    return (
        <button
            className="invisible group-hover:visible w-9 h-9 absolute top-1/2 -translate-y-1/2 z-10 left-6 group-hover:left-4 transition-all ease-linear duration-200 hover:bg-[#D9A953] hover:text-white hover:border-[#D9A953] rounded-full border-2 border-gray-400 text-gray-400"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    )
}

export default PrevArrow;