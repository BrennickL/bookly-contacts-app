class Api::ContactsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_contact, only: [:show, :update, :destroy]

  def index
    contacts = Contact
      .all
      .where("last ILIKE '#{params[:letter]}%'")
      .order(:last, :first)
      .page(params[:page]).per_page(params[:per_page])

      render_pagination_as_json contacts
  end

  def show
    render json: @contact
  end

  def create
    contact = Contact.create(contact_params)
    if contact.save
      render json: contact
    else
      render_errors contact
    end
  end

  def update
    if @contact.update(contact_params)
      render json: @contact
    else
      render_error @contact
    end
  end

  def destroy
    @contact.destroy
  end

  private

  def set_contact
    @contact = Contact.find(params[:id])
  end

  def contact_params
    params.require(:contact)
      .permit(
        :id, :first, :last, :gender, :birthdate,
        :user_id, :created_at, :updated_at,
      )
  end
end
