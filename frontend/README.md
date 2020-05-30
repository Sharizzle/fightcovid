# Fight COVID UK Frontend repo

Big apologies if this is messy. I'm a (very) junior engineer with only a few weeks of development time; an alarming proportion of this was codebase was developed in the early hours of the morning.

I haven't had much / any time for cleanup, but if you're familiar with react / typescript, you should hopefully be able to work out what's going on.

I've given a very high-level and overly brief overview below.

Best of luck!

## Stack

* [Webpack](https://webpack.js.org) builder with dev and prod modes, devserver and analysis
* [Ant Design](https://ant.design) with ANTD icons import mitigation
* React 16 (hooks, functional components) framework
* Typescript
* ESLint
* Prettier
* React Router
* Static main HTML file
* Single page app. Static JS bundles (main, react, antd, vendors)
* Less CSS
* Firebase serverless backend with the JS/Web SDK


## Super rough overview of the frontend:
Our "root" component is App. Within App, we provide 6 contexts:
1. FirestoreContext
2. AuthHookContext
3. CurrentUserInfoContext
4. ProjectSignatureContext
5. VolunteerSignatureContext 
6. AnalytcsContext

This architecture prevents the overfetching of data (to an extent) Components listen to single/centralised context values provided here rather than being responsible for fetching data themselves. 

(This is approximately true.) There is still overfetching, but it isn't so bad.

In general, there is probably a framework to use here, but I just hacked this together expediently. (Redux is verbose, so I avoided it.)

Right now, everything is just client side. We fetch 'signatures' from firebase (userSig, projectSig), which are used for
pagination-like behaviour and filtering. These are pretty small (~50b for project sigs , ~66b for vol sigs when compressed), so
for a few hundred projects / volunteers, it's fine to send them all to the client; for larger numbers, this must be moved
server-side.

Throughout the codebase, we don't listen to context values directly, only through certain hooks. (Again, approximately true.)
--- e.g:
```javascript
useFirestore: () => undefined | firebase.firestore.Firestore = () => {
  return useContext(FirestoreContext);
};
```

Following App's children, the next most significant component is probably AppContextSwitcher. This component selectively renders the pages depending on the
routes; it allows us to not reload the entire page. We have a route-mapping.tsx file which maps routes to react components (and other metadata).

The route stuff is pretty hacky. 

## Installation / starting up.

For local dev :

1. Download
2. run yarn
3. yarn start for dev mode

Firebase will have to be set up to use real users / data. You'll need entries for:

Analytics, Auth and 
Firestore with docs for userSigs, users, projectSigs, projectIds, projects.
