import Typography from 'antd/es/typography';
import { LoremIpsum } from 'lorem-ipsum';
import React, { useMemo } from 'react';
const { Paragraph } = Typography;
const DEFAULT_WORDS = 20;
const DEFAULT_PARAGRAPHS = 1;
function getLipsumParaRecords(words = DEFAULT_WORDS, paragraphs = DEFAULT_PARAGRAPHS) {
    const generator = new LoremIpsum({
        sentencesPerParagraph: {
            max: 5,
            min: 2
        },
        wordsPerSentence: {
            max: words,
            min: 5
        }
    });
    const records = [];
    for (let i = 0; i < paragraphs; i++) {
        records.push(generator.generateParagraphs(1));
    }
    return records;
}
export const LipsumPara = (props) => {
    const data = useMemo(() => getLipsumParaRecords(props.words, props.paragraphs), [props.words, props.paragraphs]);
    return React.createElement("div", null, data.map((paragraph, idx) => {
        let text = paragraph;
        if (!text.endsWith('.')) {
            text += '. ';
        }
        return React.createElement(Paragraph, { key: idx }, text);
    }));
};
//# sourceMappingURL=lipsum.js.map