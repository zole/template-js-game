# template-js-game
Personal template for ES6-based games

## Usage

### Setup

```shell
  git clone -o template-origin git@github.com:zole/template-js-game.git $PROJECT_NAME
  cd $PROJECT_NAME
  # Create a working branch
  git checkout -b main
  # add submodule dependencies, if available
  git submodule update --init
```

### Update the template for other projects

```shell
  git pull template-origin template
  git switch template
  git cherry-pick <commit hash>
  git push templ  # if you are me
```

### Pick up changes from the template for a project

```shell
  git switch template
  git pull template-origin
  git switch main
  git rebase -i template  # and good luck to you
 ```

## Library strategy

In order to share code from project to project:

* pnpm resolves the local package for build: 
  * `pnpm-workspace.yaml` defines `lib/` as a workspace
  * The root `package.json` depends on `"gamebucket": "workspace:^"` which is resolved to lib/
  * Dependencies specified in `lib/package.json` will be installed in the root's `node_modules`
* Typescript also needs to be told about the package so it will pick up the package's
  own Typescript configs:
  * `src/tsconfig.json` has `"references": [{ "path": "../lib" }]`
* There may be a better way to do this, but so far this is where we're at