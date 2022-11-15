import { ChangeEvent } from 'react';
import { MdOutlineSearch } from 'react-icons/md';

type FilterMenuProps = {
    onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FilterMenu = ({ onSearchInputChange }: FilterMenuProps) => (
    <div className="flex w-full justify-end">
        <div className="background-transparent group flex h-11 w-full flex-row items-center gap-3 rounded-full border border-white px-5 py-3 md:w-fit">
            <MdOutlineSearch size={20} />
            <input
                className="bg-transparent text-sm tracking-wide text-secondary outline-none"
                onChange={onSearchInputChange}
                placeholder="Filter bounties..."
                type="text"
            />
        </div>
    </div>
);

export default FilterMenu;
