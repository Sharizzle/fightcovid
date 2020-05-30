import React, { useCallback, useMemo, useState } from 'react';
import { Filter, TFilterData, TTagSet } from '../filter/filter';
import { ShowFiltersButton } from '../show-filters-button/show-filters-button';
import useDebounce from '../../hooks/useDebounce';

// TODO: Everything is client side at the moment, but this will be need later.
const queryThrottlePeriod = 100;

export interface TSelectedTagStateContext {
    selectedTags: Array<TTagSet>;
    selectTag: (tagId: string, category: string) => void;
    unselectTag: (tagId: string, category: string) => void;
}

export const SelectedTagStateContext = React.createContext({
    selectedTags: [],
    selectTag: (tagId: string, category: string) => {
        throw `Cannot set ${tagId} / ${category} --- a callback function is needed!`;
    },
    unselectTag: (tagId: string, category: string) => {
        throw `Cannot unset ${tagId} / ${category} --- a callback function is needed!`;
    },
} as TSelectedTagStateContext);

export const QueryInputWrapper: React.FC<{
    allFilterData: Array<TFilterData>;
    listConstructor: (queryTags: Array<TTagSet>) => React.ReactNode;
}> = (props: {
    allFilterData: Array<TFilterData>;
    listConstructor: (queryTags: Array<TTagSet>) => React.ReactNode;
}) => {
    const [displayFilters, setDisplayFilters] = useState(false);

    const clickFilterButtonCallback = useCallback(() => {
        setDisplayFilters(!displayFilters);
    }, [displayFilters]);

    // This is not necessary for now; when we move things server-side, using a debounced query is probably best.
    const [debouncedQueryTagState, queryTagStates, setQueryTagStates] = useDebounce<Array<TTagSet>>(
        props.allFilterData.map((filterData: TFilterData) => {
            return { category: filterData.tagSet.category, tags: [] } as TTagSet;
        }) as Array<TTagSet>,
        queryThrottlePeriod,
    );

    const filteredList = useMemo(() => props.listConstructor(debouncedQueryTagState), [
        JSON.stringify(debouncedQueryTagState),
    ]);

    const selectTagCallback: (tagId: string, category: string) => void = (tagId: string, category: string) => {
        const newSelectedTagStates: Array<TTagSet> = queryTagStates.map((tagSet: TTagSet) => {
            if (tagSet.category === category) {
                return {
                    category: category,
                    tags: [...new Set([...tagSet.tags, tagId])],
                };
            }
            return tagSet;
        });
        setQueryTagStates(newSelectedTagStates);
    };

    const unselectTagCallback: (tagId: string, category: string) => void = (tagId: string, category: string) => {
        const newSelectedTagStates: Array<TTagSet> = queryTagStates.map((tagSet: TTagSet) => {
            if (tagSet.category === category) {
                return {
                    category: category,
                    tags: tagSet.tags.filter((tag) => tag !== tagId),
                };
            }
            return tagSet;
        });
        setQueryTagStates(newSelectedTagStates);
    };

    const contextValue = {
        selectedTags: queryTagStates,
        selectTag: selectTagCallback,
        unselectTag: unselectTagCallback,
    } as TSelectedTagStateContext;

    return (
        <SelectedTagStateContext.Provider value={contextValue}>
            <ShowFiltersButton show={displayFilters} onClick={clickFilterButtonCallback} />
            <div className="common-break-8px" />
            {displayFilters &&
                props.allFilterData.map((filterData: TFilterData) => (
                    <React.Fragment key={filterData.tagSet.category}>
                        <Filter filterData={filterData} />
                        <div className="common-break-8px" />
                    </React.Fragment>
                ))}
            {filteredList}
        </SelectedTagStateContext.Provider>
    );
};
