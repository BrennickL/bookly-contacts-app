class Api::EmailsController < ApplicationController
  before_action :set_email, only: [:show, :update, :destroy]

  def index
    render json: Contact.find(params[:contact_id])
      .emails.all.order(:type_of)
  end

  def show
    render json: @email
  end

  def create
    email = Contact.find(params[:contact_id])
      .emails.build(email_params)
    if email.save
      render json: email
    else
      render_errors email
    end
  end

  def update
    if @email.update(email_params)
      render json: @email
    else
      render_errors @email
    end
  end

  def destroy
    @email.destroy
  end

  private

  def set_email
    @email = Email.find(params[:id])
  end

  def email_params
    params.require(:email)
      .permit(
        :type_of, :address,
        :id, :created_at, :updated_at
      )
  end
end
