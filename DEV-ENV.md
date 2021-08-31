# DEV ENV
*this is all considering you are using a mac book pro*

## Editor

[vscode](https://code.visualstudio.com/) this project comes with some recommended vscode extensions and settings.

## Browser

[Chrome](https://www.google.com/intl/en_in/chrome/)

## Terminal

[iterm2](https://iterm2.com/) + [ohmyz](https://ohmyz.sh/) with following configurations. Please install these form respective links.

### install homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### install starship

```bash
brew install starship
```

### run the following

```bash
echo 'eval "$(starship init zsh)"' >> ~/.zshrc
```

### Colors and Fonts for Iterm2

[snazzy](https://github.com/sindresorhus/iterm2-snazzy)
[Firacode](https://www.nerdfonts.com/font-downloads)

### Install Firacode

```bash
brew tap homebrew/cask-fonts && brew install --cask font-fira-code
```

### Use powerline theme

```bash
#install powerline

git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k

# edit ~/.zshrc

ZSH_THEME="powerlevel9k/powerlevel9k"
```

### install powerline fonts

```bash
pip3 install --user powerline-status
```

it might ask you to do

```bash
pip3 install --upgrade pip
```

```bash
# install Fonts

git clone https://github.com/powerline/fonts
cd fonts
./install.sh
cd ..
rm -rf fonts
```

*you can then select the respective colors and fonts from iterm2 - preferences - profile*

### some zsh goodies

```bash
# add this to ~/.zshrc

POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir rbenv vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status root_indicator background_jobs history time)

# moreover to make the two lines prompt you have to add this
POWERLEVEL9K_PROMPT_ON_NEWLINE=true

# Add a space in the first prompt
POWERLEVEL9K_MULTILINE_FIRST_PROMPT_PREFIX="%f"
# Visual customisation of the second prompt line
local user_symbol="$"
if [[ $(print -P "%#") =~ "#" ]]; then
    user_symbol = "#"
fi
POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX="%{%B%F{black}%K{yellow}%} $user_symbol%{%b%f%k%F{yellow}%} %{%f%}"

# Colorise the top Tabs of Iterm2 with the same color as background
# Just change the 18/26/33 wich are the rgb values
echo -e "\033]6;1;bg;red;brightness;18\a"
echo -e "\033]6;1;bg;green;brightness;26\a"
echo -e "\033]6;1;bg;blue;brightness;33\a"
```

### plugins

```bash
plugins=(git brew autojump zsh-syntax-highlighting zsh-autosuggestions)

# how to install these?

brew install autojump

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting


git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### source it up

```bash
source ~/.zshrc

# refresh
exec zsh
```

### do your nvm right

you can install node with

```bash
brew install node
node --version
npm --version
```

or even better you can [nvm](https://github.com/nvm-sh/nvm) it up, to always use node LTS

```bash
brew install nvm
brew info nvm
nvm alias default lts/*
echo "lts/*" > ~/.nvmrc
nvm install
nvm use
```

### utilities

- [thefuck](https://github.com/nvbn/thefuck)?

thefuck is a nifty tool that allows you to fix your previous CLI typos by just typing fuck. It perhaps has the greatest UX of all products, ever.
Installing it is easy. Then follow the instructions:

```bash
brew info thefuck
```
