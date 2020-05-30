import { useAuthUser } from './authHooks';
import { TProjectInfo, TProjectSig } from '../common/project-info-types';
import { useContext, useEffect, useState } from 'react';
import { AnalyticsContext, ProjectSignatureContext } from '../app';
import { useFirestore } from './useFirestore';

export const useReadProjectSignaturesForContext: () => undefined | Array<TProjectSig> = () => {
    const store = useFirestore();

    const [projectSigs, setProjectSigs] = useState(undefined as undefined | Array<TProjectSig>);

    useEffect(() => {
        let unsubscribe;
        if (store) {
            unsubscribe = store.collection('projects').onSnapshot((querySnapshot): void => {
                const projects = [] as Array<TProjectSig>;
                querySnapshot.forEach((doc) => {
                    const projectData: TProjectSig = doc.data() as TProjectSig;
                    projects.push(projectData);
                });
                setProjectSigs(projects);
            });
        }
        return (): void => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [store]);

    return projectSigs;
};

export const useReadProjectSignatures = (): undefined | Array<TProjectSig> => {
    return useContext(ProjectSignatureContext);
};

export const useProjectCount = (): undefined | number => {
    const projectSignatures = useReadProjectSignatures();
    return projectSignatures?.length;
};

export const useUpdateProject: () => (projectInfo: TProjectInfo) => Promise<void> = () => {
    const store = useFirestore();
    const { authUser } = useAuthUser();

    const analytics = useContext(AnalyticsContext);

    return async (projectInfo: TProjectInfo): Promise<void> => {
        if (analytics) {
            analytics.logEvent('updated_project_info');
        }
        if (store && !!authUser) {
            try {
                const sigPromise = store
                    .collection('projectSigs')
                    .doc(projectInfo.id)
                    .set({
                        lookingForSkillsTagIDs: projectInfo.lookingForSkillsTagIDs,
                        stage: projectInfo.stage as string,
                        categories: projectInfo.categories,
                    } as TProjectSig);

                const projectPromise = store
                    .collection('projects')
                    .doc(projectInfo.id)
                    .set({ ...projectInfo } as TProjectInfo);

                await sigPromise;
                await projectPromise;
            } catch (error) {
                console.error(error);
            }
        }
    };
};

export const useDeleteProject: () => (id: string) => Promise<void> = () => {
    const store = useFirestore();
    const { authUser } = useAuthUser();
    const analytics = useContext(AnalyticsContext);
    return async (id: string): Promise<void> => {
        if (analytics) {
            analytics.logEvent('deleted_project_info');
        }
        if (store && !!authUser) {
            try {
                const idPromise = store.collection('projectIds').doc(id).delete();
                const sigPromise = store.collection('projectSigs').doc(id).delete();
                const projectPromise = store.collection('projects').doc(id).delete();

                await idPromise;
                await sigPromise;
                await projectPromise;
            } catch (error) {
                console.error(error);
            }
        }
    };
};

export const useCreateProject: () => (projectInfo: TProjectInfo) => Promise<void> = () => {
    const store = useFirestore();
    const { authUser } = useAuthUser();
    const analytics = useContext(AnalyticsContext);

    return async (projectInfo: TProjectInfo): Promise<void> => {
        if (analytics) {
            analytics.logEvent('created_project');
        }
        if (store && !!authUser) {
            try {
                const newProjectIDDoc = await store.collection('projectIds').add({});
                const id = newProjectIDDoc.id;

                const sigPromise = store
                    .collection('projectSigs')
                    .doc(id)
                    .set({
                        id: id,
                        createdBy: authUser?.uid as string,
                        lookingForSkillsTagIDs: projectInfo.lookingForSkillsTagIDs,
                        stage: projectInfo.stage as string,
                        categories: projectInfo.categories,
                    } as TProjectSig);

                const projectPromise = store
                    .collection('projects')
                    .doc(id)
                    .set({ ...projectInfo, id: id } as TProjectInfo);

                await sigPromise;
                await projectPromise;
            } catch (error) {
                console.error(error);
            }
        }
    };
};

export const useReadFullProjectFromID: (id?: string) => undefined | TProjectInfo = (id?: string) => {
    const store = useFirestore();
    const [projectData, setProjectData] = useState(undefined as undefined | TProjectInfo);

    useEffect(() => {
        let isCancelled = false;
        if (store && id) {
            store
                .collection('projects')
                .doc(id)
                .get()
                .then((querySnapshot): void => {
                    if (!isCancelled) {
                        setProjectData(querySnapshot.data() as TProjectInfo);
                    }
                });
        }
        return function cleanup(): void {
            isCancelled = true;
        };
    }, [store, id]);

    return projectData;
};

export const useReadCurrentUsersProjects: () => undefined | Array<TProjectInfo> = () => {
    const store = useFirestore();
    const { authUser } = useAuthUser();
    const [projectData, setProjectData] = useState(undefined as undefined | Array<TProjectInfo>);
    useEffect(() => {
        let isCancelled = false;
        if (store && authUser && authUser.uid) {
            store
                .collection('projects')
                .where('createdBy', '==', authUser.uid)
                .get()
                .then((querySnapshot): void => {
                    if (!isCancelled) {
                        const projects = [] as Array<TProjectInfo>;
                        querySnapshot.forEach(function (doc) {
                            const projectData: TProjectInfo = { id: doc.id, ...doc.data() } as TProjectInfo;
                            projects.push(projectData);
                        });
                        setProjectData(projects);
                    }
                });
        }
        return function cleanup(): void {
            isCancelled = true;
        };
    }, [store, authUser]);

    return projectData;
};

// TODO: This is a major hack for now.
export const useHasCurrentUserCreatedAProject: () => undefined | boolean = () => {
    const currentUsersProjects = useReadCurrentUsersProjects();
    return currentUsersProjects && currentUsersProjects.length > 0;
};

export const useReadProjectsOfUserByID: (id?: string) => undefined | Array<TProjectInfo> = (id?: string) => {
    const store = useFirestore();
    const [projectData, setProjectData] = useState([] as Array<TProjectInfo>);

    useEffect(() => {
        let isCancelled = false;
        if (store && id) {
            store
                .collection('projects')
                .where('createdBy', '==', id)
                .get()
                .then((querySnapshot): void => {
                    if (!isCancelled) {
                        const projects = [] as Array<TProjectInfo>;
                        querySnapshot.forEach(function (doc) {
                            const projectData: TProjectInfo = { id: doc.id, ...doc.data() } as TProjectInfo;
                            projects.push(projectData);
                        });
                        setProjectData(projects);
                    }
                });
        }
        return function cleanup(): void {
            isCancelled = true;
        };
    }, [id, store]);

    return projectData;
};

export const useReadFeaturedProjects: () => undefined | Array<TProjectInfo> = () => {
    const store = useFirestore();
    const [projectData, setProjectData] = useState([] as Array<TProjectInfo>);

    useEffect(() => {
        if (store) {
            const fpRef = store.collection('/featuredProjects');
            const projectsRef = store.collection('/projects');

            fpRef.get().then(
                async (querySnapshot): Promise<void> => {
                    const projectIds = [] as Array<string>;
                    querySnapshot.forEach(function (doc) {
                        projectIds.push(doc.id as string);
                    });

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const projectPromises = [] as Array<Promise<any>>;
                    projectIds.forEach((projectId: string) => {
                        projectPromises.push(projectsRef.doc(projectId).get());
                    });

                    const data = [] as Array<TProjectInfo>;
                    for (const p of projectPromises) {
                        const projectRes = await p;
                        data.push(projectRes.data() as TProjectInfo);
                    }
                    setProjectData(data);
                },
            );
        }
    }, [store]);

    return projectData;
};
