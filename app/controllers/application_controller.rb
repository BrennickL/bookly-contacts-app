class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def render_errors(model)
    render json: { errors: model.errors.full_messages.join(',\n')}, status: 422
  end

  def render_pagination_as_json(model)
    render json: {
      data: model,
      pagination: {
        total_pages: model.total_pages,
        current_page: model.current_page,
        next_page: model.next_page
      }
    }
  end
end
