class Api::V1::QuestionsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    questions = if params[:tag_id].to_i.zero?
                  Question.includes(:tag).all.order('questions.id ASC')
                else
                  Question.joins(:tag).includes(:tag).where('tags.id = ?', params[:tag_id]).order('questions.id ASC')
                end
    questions_response = questions.map { |q| question_response(q) }
    render json: questions_response, status: :ok
  end

  def update_counter
    @question = Question.includes(:tag).where(questions: { id: params[:id] }).first
    case params[:type]
    when 'like'
      @question.update!(like_count: @question.like_count + 1)
    when 'dislike'
      @question.update!(dislike_count: @question.dislike_count + 1)
    end

    render json: question_response(@question), status: :ok
  end

  def create
    @question = Question.new(question_params)

    if @question.save
      render json: { status: 'success', data: question_response(@question) }, status: :ok
    else
      render json: { status: 'failure', messages: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def question_response(question)
    { id: question.id, title: question.title, tag: question.tag.name,
      like_count: question.like_count, dislike_count: question.dislike_count }
  end

  def question_params
    params.require(:question).permit(:title, :tag_id)
  end
end
