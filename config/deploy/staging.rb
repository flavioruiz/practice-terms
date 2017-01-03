# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :app, %w{ubuntu@staging.evisit.com}, ssh_options: {port: 50122}

# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

server 'staging.evisit.com', user: 'ubuntu', roles: %w{app}

set :stage, :staging

set :branch, 'master'
set :deploy_to, '/web/evisit.com/practice-terms'
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules')

# capistrano-npm
set :node_env, "staging"
set :node_user, "ubuntu"
set :npm_flags, '--silent --no-spin'
