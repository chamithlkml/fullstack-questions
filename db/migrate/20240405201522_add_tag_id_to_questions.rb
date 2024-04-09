class AddTagIdToQuestions < ActiveRecord::Migration[7.1]
  def change
    add_reference :questions, :tag, foreign_key: true
  end
end
