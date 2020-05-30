import { PageController } from '../page-controller/page-controller';
import { NumberResultsPerPage } from '../../common/common-constants';
import { Skeleton } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { TProjectRankAugmentedSignature, TVolunteerRankAugmentedSignature } from '../../hooks/rankingHooks';
import { useNumericSessionState } from '../../hooks/useSessionState';

export const SignatureListPaginator: React.FC<{
    queryResultSize: number;
    rankedSignatureData?: Array<TProjectRankAugmentedSignature | TVolunteerRankAugmentedSignature>;
    listItemCreator: (rankSig: TProjectRankAugmentedSignature | TVolunteerRankAugmentedSignature) => React.ReactElement;
}> = (props: {
    queryResultSize: number;
    rankedSignatureData?: Array<TProjectRankAugmentedSignature | TVolunteerRankAugmentedSignature>;
    listItemCreator: (rankSig: TProjectRankAugmentedSignature | TVolunteerRankAugmentedSignature) => React.ReactElement;
}) => {
    const { queryResultSize, rankedSignatureData, listItemCreator } = props;
    const [pageNum, setPageNum] = useNumericSessionState(0, 'pageNum');

    const pagedSigs = rankedSignatureData?.slice(pageNum * NumberResultsPerPage, (pageNum + 1) * NumberResultsPerPage);

    useEffect(() => {
        setPageNum(0);
    }, [rankedSignatureData]);

    const nextPage = useCallback(() => {
        setPageNum(pageNum + 1);
    }, [pageNum]);

    const prevPage = useCallback(() => {
        setPageNum(pageNum - 1);
    }, [pageNum]);

    return (
        <>
            <PageController
                nextPageCallback={nextPage}
                prevPageCallback={prevPage}
                pageNum={pageNum}
                numResultsPerPage={NumberResultsPerPage}
                totalNumberResults={queryResultSize}
            />
            {!!pagedSigs && pagedSigs.length >= 0 ? (
                pagedSigs.map((rankSig: TProjectRankAugmentedSignature | TVolunteerRankAugmentedSignature) => (
                    <React.Fragment key={rankSig.signature.id}>{listItemCreator(rankSig)}</React.Fragment>
                ))
            ) : (
                <>
                    <Skeleton active={true} />
                    <Skeleton active={true} />
                </>
            )}
            <PageController
                nextPageCallback={(): void => {
                    window.scrollTo(0, 0);
                    nextPage();
                }}
                prevPageCallback={(): void => {
                    window.scrollTo(0, 0);
                    prevPage();
                }}
                pageNum={pageNum}
                numResultsPerPage={NumberResultsPerPage}
                totalNumberResults={queryResultSize}
            />
        </>
    );
};
