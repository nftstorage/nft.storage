# This Dockerfile is based on the docker-from-docker devcontainer template: 
# https://github.com/microsoft/vscode-dev-containers/tree/main/containers/docker-from-docker
# 
# It uses the typescript-node devcontainer as a base and allows access to the host's Docker environment.
# This lets you call `docker compose` from inside the container, which is needed in order for `yarn dev`
# and `yarn test` to work.
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:16-bullseye AS dev-base

# [Option] Install zsh
ARG INSTALL_ZSH="true"
# [Option] Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="false"
# [Option] Enable non-root Docker access in container
ARG ENABLE_NONROOT_DOCKER="true"
# [Option] Use the OSS Moby CLI instead of the licensed Docker CLI
ARG USE_MOBY="true"
# [Option] Select CLI version
ARG CLI_VERSION="latest"

# Enable new "BUILDKIT" mode for Docker CLI
ENV DOCKER_BUILDKIT=1

# Install needed packages and setup non-root user. Use a separate RUN statement to add your
# own dependencies. A user of "automatic" attempts to reuse an user ID if one already exists.
ARG USERNAME=automatic
ARG USER_UID=1000
ARG USER_GID=$USER_ID
COPY ./.devcontainer/library-scripts/*.sh /tmp/library-scripts/
RUN apt-get update \
    && /bin/bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true" \
    # Use Docker script from script library to set things up
    && /bin/bash /tmp/library-scripts/docker-debian.sh "${ENABLE_NONROOT_DOCKER}" "/var/run/docker-host.sock" "/var/run/docker.sock" "${USERNAME}" "${USE_MOBY}" "${CLI_VERSION}" \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to 
# the Docker socket if "overrideCommand": false is set in devcontainer.json. 
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# install playwright and tell it to download chromium
RUN sudo -u node npx playwright@1.20.0 install --with-deps chromium

# This build stage copies over the source tree and removes everything except package.json files,
# allowing the final image to cache the result of `yarn install` before copying in any source files.
# The end result is that changes to source files won't cause the cached dependencies to be invalidated,
# and rebuilding the image will only cause a `yarn install` if any package.json or the yarn.lock file
# changes.
# Thanks to https://stackoverflow.com/a/63142468 for inspiration.
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:16-bullseye AS prepare-package-tree

RUN mkdir -p /nft.storage
RUN chown node /nft.storage
WORKDIR /nft.storage

COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages ./packages

# find and remove everything except package.json files
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

# The final stage uses the previously built dev-base layer and copies over the bare source tree
# (with just the package.json files and yarn.lock). It runs yarn install to cache the result,
# then copies over the whole source tree.
FROM dev-base AS devcontainer

RUN mkdir -p /nft.storage
RUN chown node /nft.storage
WORKDIR /nft.storage

# copy the files from the previous stage and run yarn install
COPY --from=prepare-package-tree /nft.storage .
RUN yarn install --frozen-lockfile

# now copy over the whole source tree and yarn install again, to restore workspace symlinks
COPY . .
RUN yarn install --frozen-lockfile
