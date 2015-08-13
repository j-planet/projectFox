class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :trackable, :validatable, :omniauthable,
         omniauth_providers: [:facebook, :twitter], authentication_keys: [:login]

  has_many :items, dependent: :destroy
  has_many :user_identifications, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :transactions, dependent: :destroy

  validates_uniqueness_of :email, :username
end
