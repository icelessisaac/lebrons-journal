# SPDX-FileCopyrightText: 2021-2025 Akira Komamura
# SPDX-License-Identifier: Unlicense
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    # Support a particular subset of the Nix systems
    systems.url = "github:nix-systems/default";
  };

  outputs =
    { nixpkgs, ... }:
    let
      eachSystem =
        f:
        nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = eachSystem (pkgs: {
        default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_23

            # Alternatively, you can use a specific major version of Node.js

            # pkgs.nodejs-22_x

            # Use corepack to install npm/pnpm/yarn as specified in package.json
            pkgs.corepack
          ];
        };
      });
    };
}
