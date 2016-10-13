class HelloWorldController < ApplicationController
  def index
    @hello_world_props = { name: "Stranger" }
    render text: nil, layout: true
  end
end
