class User < ApplicationRecord
  has_and_belongs_to_many :tracks
  has_many :user_rooms
  has_many :rooms, through: :user_rooms

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
