#!/bin/bash

rake db:drop
rm ./db/schema.rb
rake db:create
rake db:migrate
rake db:seed