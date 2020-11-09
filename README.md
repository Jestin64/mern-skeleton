# Project name: mern-skeleton
# purpose: to serve as a basic foundation for mern applications by providing the basic ready-to-use building # blocks

# contains: 
    1) Backend with MongoDB, express and node.
    2) Frontend with React.


# commands:
    yarn init -y : initializes the project folder with a package.json file, keeps track of the development
        dependencies and set configuration variables to be used in the code, run scripts for development and production environments.
        

# Front-end: React
    # devDependcies: 
        # webpack: front end code bundler- minimizes code with dependencies modules into a single file and serve it on the browser
            install: yarn add --dev webpack 
        # webpack-dev-middleware: a wrapper that emits files processed from webpack to a server(in this case an express server) with a publicPath.
        #webpack-hot-middleware: allows hot reloading with webpack-dev-middleware 
            official documentation: https://github.com/webpack-contrib/webpack-hot-middleware
        
        