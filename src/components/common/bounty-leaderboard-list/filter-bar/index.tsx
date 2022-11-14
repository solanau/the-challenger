import { MdOutlineSearch } from 'react-icons/md';
import { cn } from 'utils';

/**
 * Definition of an interactable button component.
 *
 * @param type `type` Attribute of the `<button>` element.
 * @param variant Variations relating to pre-defined styling of the element
 * @param text Text to display in the button.
 */
const FilterBar = () => (
    <div className="group flex h-full flex-col items-center justify-between">
        <div className="flex flex-row items-center gap-3">
            <MdOutlineSearch size={20} className="text-white" />
            <input
                className="w-32 bg-transparent text-sm tracking-wide text-secondary outline-none valid:text-primary"
                // onChange={onSearchInputChange}
                placeholder="Filter bounties..."
                type="text"
            />
        </div>

        <div
            className={cn(
                'h-1 w-1/4 transition-all duration-300 ease-out',
                'group-valid-within:w-full group-focus-within:w-full group-focus-within:bg-primary',
                'group-hover:w-1/2 group-hover:bg-primary-focus',
            )}
        />
    </div>
);

export default FilterBar;
