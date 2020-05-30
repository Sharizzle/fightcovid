import { PreviousPageButton } from '../previous-page-button/previous-page-button';
import { NextPageButton } from '../next-page-button/next-page-button';
import { Card, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export const PageController: React.FC<{
    nextPageCallback: () => void;
    prevPageCallback: () => void;
    pageNum: number;
    numResultsPerPage: number;
    totalNumberResults: number;
}> = (props: {
    nextPageCallback: () => void;
    prevPageCallback: () => void;
    pageNum: number;
    numResultsPerPage: number;
    totalNumberResults: number;
}) => {
    const { nextPageCallback, prevPageCallback, pageNum, numResultsPerPage, totalNumberResults } = props;
    return (
        <Card className="page-controller-container">
            <div className="simple-flex-row-nowrap">
                <Text>
                    {`Showing ${pageNum * numResultsPerPage + 1}-${Math.min(
                        (pageNum + 1) * numResultsPerPage,
                        totalNumberResults,
                    )} of ${totalNumberResults} results`}
                </Text>
                <div className="flex-grow-box" />
                {pageNum > 0 && <PreviousPageButton onClick={prevPageCallback} />}
                <Text className="page-controller-page-text">Page {pageNum + 1}</Text>
                {(pageNum + 1) * numResultsPerPage < totalNumberResults && (
                    <NextPageButton onClick={nextPageCallback} />
                )}
            </div>
        </Card>
    );
};
