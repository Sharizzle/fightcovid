import { useHistory } from 'react-router';

export const useRedirect: () => (path: string) => void = () => {
    const history = useHistory();
    return (path: string): void => history.push(path);
};
