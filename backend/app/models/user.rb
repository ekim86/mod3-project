class User < ApplicationRecord
  has_many :photos

  # validates :name, presence: true, case_sensitive: false
  #we may need to include error message later

end
