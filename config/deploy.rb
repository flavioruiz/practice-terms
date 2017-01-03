# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'eVsit-Practice-Terms'
set :repo_url, 'https://github.com/eVisit/practice-terms.git'

set :npm_roles, :app
set :npm_target_path, -> { release_path.join('md2pdf') }
