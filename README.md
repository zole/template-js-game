# template-js-game
Personal template for ES6-based games

## Usage

### Setup

```shell
  git clone -o templ git@github.com:zole/template-js-game.git $PROJECT_NAME
  cd $PROJECT_NAME
  # Create a working branch
  git checkout -b main
```

### Update the template for other projects

```shell
  git pull templ template
  git switch template
  git cherry-pick <commit hash>
  git push templ  # if you are me
```

### Pick up changes from the template for a project

```shell
  git switch template
  git pull templ
  git switch main
  git rebase -i template  # and good luck to you
 ```
