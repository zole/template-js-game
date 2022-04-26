# template-js-game
Personal template for ES6-based games

## Usage

### Setup

```shell
  git clone -o template git@github.com:zole/template-js-game.git $PROJECT_NAME
  cd $PROJECT_NAME
  # Create a working branch
  git checkout -b main
```

### Update the template for other projects

```shell
  git pull template template
  git switch template
  git cherry-pick <commit hash>
  git push template
```

### Pick up changes from the template for a project

```shell
  git pull template template
  git switch main
  git merge template  # and good luck to you
 ```
