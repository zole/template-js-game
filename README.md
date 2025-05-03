# template-js-game
Personal template for ES6-based games

## Usage

### Setup

```shell
  git clone -o template-origin git@github.com:zole/template-js-game.git $PROJECT_NAME
  cd $PROJECT_NAME
  # Create a working branch
  git checkout -b main
  # in order to use unpublished changes to @gamebucket packages:
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

In order to share non-project-specific code which is also under development, the
template includes https://github.com/BucketOSoftware/gamebucket-common as a
submodule and references the packages in `pnpm-workspace.yaml`. The packages
need to be built after changes when running locally, e.g.:
```
pnpm run -r build
```
There may be a better way to do this, but so far this is where we're at.