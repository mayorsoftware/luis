exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: "less-loader",
              options: {
                modifyVars: {
                  "font-face": `'Inter', serif`,
                  "heading-color": "rgba(0, 0, 0, 1)", // heading text color
                  "text-color": "rgba(0, 0, 0, 1)", // major text color
                  "text-color-secondary": "rgba(0, 0, 0, 1)", // secondary text color
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
      }),
    ],
  })
}
