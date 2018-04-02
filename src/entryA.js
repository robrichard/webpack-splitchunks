console.log('entryA');

import(/* webpackChunkName: "asyncA" */ './asyncA').then(() => {
    console.log('loaded asyncA');
});