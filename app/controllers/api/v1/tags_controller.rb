class Api::V1::TagsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    render json: tag_list, status: :ok
  end

  private

  def tag_list
    tags = Tag.all.map { |tag| tag_response(tag) }
    tags.unshift({ id: 0, label: 'All' })

    tags
  end

  def tag_response(tag)
    { id: tag.id, label: tag.name }
  end
end
